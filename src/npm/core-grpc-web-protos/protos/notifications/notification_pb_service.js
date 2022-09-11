// package: notification
// file: notifications/notification.proto

var notifications_notification_pb = require("../notifications/notification_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Notification = (function () {
  function Notification() {}
  Notification.serviceName = "notification.Notification";
  return Notification;
}());

Notification.GetNotifications = {
  methodName: "GetNotifications",
  service: Notification,
  requestStream: false,
  responseStream: true,
  requestType: notifications_notification_pb.NotificationRequest,
  responseType: notifications_notification_pb.NotificationResponse
};

Notification.StreamNotifications = {
  methodName: "StreamNotifications",
  service: Notification,
  requestStream: true,
  responseStream: true,
  requestType: notifications_notification_pb.NotificationRequest,
  responseType: notifications_notification_pb.NotificationResponse
};

exports.Notification = Notification;

function NotificationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NotificationClient.prototype.getNotifications = function getNotifications(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Notification.GetNotifications, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

NotificationClient.prototype.streamNotifications = function streamNotifications(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Notification.StreamNotifications, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.NotificationClient = NotificationClient;

