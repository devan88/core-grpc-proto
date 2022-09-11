import * as grpc from "@grpc/grpc-js";
import {
  NotificationClient,
  NotificationRequest,
  NotificationResponse,
} from "../index";

const client = new NotificationClient(
  "localhost:5177",
  grpc.credentials.createInsecure()
);
const request = new NotificationRequest();
request.setName("Subs1");
const stream = client.getNotifications(request);
stream.on("data", (notification: NotificationResponse) => {
  console.log(`response: (${notification.getMessage()})`);
});
stream.on("end", function () {
  // The server has finished sending
});
stream.on("error", function (e) {
  // An error has occurred and the stream has been closed.
});
stream.on("status", function (status) {
  // process status
});
