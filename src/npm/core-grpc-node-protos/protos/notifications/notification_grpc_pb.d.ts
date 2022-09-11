// package: notification
// file: notifications/notification.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as notifications_notification_pb from "../notifications/notification_pb";

interface INotificationService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getNotifications: INotificationService_IGetNotifications;
    streamNotifications: INotificationService_IStreamNotifications;
}

interface INotificationService_IGetNotifications extends grpc.MethodDefinition<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse> {
    path: "/notification.Notification/GetNotifications";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<notifications_notification_pb.NotificationRequest>;
    requestDeserialize: grpc.deserialize<notifications_notification_pb.NotificationRequest>;
    responseSerialize: grpc.serialize<notifications_notification_pb.NotificationResponse>;
    responseDeserialize: grpc.deserialize<notifications_notification_pb.NotificationResponse>;
}
interface INotificationService_IStreamNotifications extends grpc.MethodDefinition<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse> {
    path: "/notification.Notification/StreamNotifications";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<notifications_notification_pb.NotificationRequest>;
    requestDeserialize: grpc.deserialize<notifications_notification_pb.NotificationRequest>;
    responseSerialize: grpc.serialize<notifications_notification_pb.NotificationResponse>;
    responseDeserialize: grpc.deserialize<notifications_notification_pb.NotificationResponse>;
}

export const NotificationService: INotificationService;

export interface INotificationServer extends grpc.UntypedServiceImplementation {
    getNotifications: grpc.handleServerStreamingCall<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
    streamNotifications: grpc.handleBidiStreamingCall<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
}

export interface INotificationClient {
    getNotifications(request: notifications_notification_pb.NotificationRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<notifications_notification_pb.NotificationResponse>;
    getNotifications(request: notifications_notification_pb.NotificationRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<notifications_notification_pb.NotificationResponse>;
    streamNotifications(): grpc.ClientDuplexStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
    streamNotifications(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
    streamNotifications(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
}

export class NotificationClient extends grpc.Client implements INotificationClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getNotifications(request: notifications_notification_pb.NotificationRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<notifications_notification_pb.NotificationResponse>;
    public getNotifications(request: notifications_notification_pb.NotificationRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<notifications_notification_pb.NotificationResponse>;
    public streamNotifications(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
    public streamNotifications(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<notifications_notification_pb.NotificationRequest, notifications_notification_pb.NotificationResponse>;
}
