//import * as grpc from "@grpc/grpc-js";
import { grpc } from "@improbable-eng/grpc-web";
import {
  Notification,
  NotificationRequest,
  NotificationResponse,
} from "../index";

// const client = new NotificationClient(
//   "localhost:5177",
//   grpc.credentials.createInsecure()
// );
// const request = new NotificationRequest();
// request.setName("Subs1");
// const stream = client.getNotifications(request);
// stream.on("data", (notification: NotificationResponse) => {
//   console.log(`response: (${notification.getMessage()})`);
// });
// stream.on("end", function () {
//   // The server has finished sending
// });
// stream.on("error", function (e) {
//   // An error has occurred and the stream has been closed.
// });
// stream.on("status", function (status) {
//   // process status
// });

const request = new NotificationRequest();
request.setName("Subs1");
const client = grpc.client(Notification.StreamNotifications, {
  host: "https://localhost:7177",
  transport: grpc.WebsocketTransport(),
});
client.onHeaders((headers: grpc.Metadata) => {
  console.log("queryBooks.onHeaders", headers);
});
client.onMessage((message: grpc.ProtobufMessage) => {
  console.log(
    "queryBooks.onMessage",
    message.toObject() as NotificationResponse
  );
});
client.onEnd((code: grpc.Code, msg: string, trailers: grpc.Metadata) => {
  console.log("queryBooks.onEnd", code, msg, trailers);
});
client.start();
client.send(request);
