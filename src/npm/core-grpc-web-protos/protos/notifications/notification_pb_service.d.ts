// package: notification
// file: notifications/notification.proto

import * as notifications_notification_pb from "../notifications/notification_pb";
import {grpc} from "@improbable-eng/grpc-web";

type NotificationGetNotifications = {
  readonly methodName: string;
  readonly service: typeof Notification;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof notifications_notification_pb.NotificationRequest;
  readonly responseType: typeof notifications_notification_pb.NotificationResponse;
};

type NotificationStreamNotifications = {
  readonly methodName: string;
  readonly service: typeof Notification;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof notifications_notification_pb.NotificationRequest;
  readonly responseType: typeof notifications_notification_pb.NotificationResponse;
};

export class Notification {
  static readonly serviceName: string;
  static readonly GetNotifications: NotificationGetNotifications;
  static readonly StreamNotifications: NotificationStreamNotifications;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class NotificationClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getNotifications(requestMessage: notifications_notification_pb.NotificationRequest, metadata?: grpc.Metadata): ResponseStream<notifications_notification_pb.NotificationResponse>;
  streamNotifications(metadata?: grpc.Metadata): BidirectionalStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
}

