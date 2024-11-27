from locust import User, task, between, events

import time
import grpc
import service_pb2_grpc
import service_pb2


class GrpcClient:
    """Cliente gRPC que mede o tempo de resposta para Locust."""

    def __init__(self, host):
        self.host = host
        self.channel = grpc.insecure_channel(self.host)
        self.stub = service_pb2_grpc.MusicServiceStub(self.channel)

    def call(self, method_name, request, metadata=None):
        """Executa uma chamada gRPC e mede o tempo de resposta."""
        start_time = time.time()
        try:
            response = getattr(self.stub, method_name)(request, metadata=metadata)
            total_time = (time.time() - start_time) * 1000  # Em milissegundos
            events.request.fire(
                request_type="gRPC",
                name=method_name,
                response_time=total_time,
                response_length=len(str(response)),
            )
            return response
        except grpc.RpcError as e:
            total_time = (time.time() - start_time) * 1000  # Em milissegundos
            events.request.fire(
                request_type="gRPC",
                name=method_name,
                response_time=total_time,
                exception=e,
            )
            raise e


class LoadTestUser(User):
    wait_time = between(1, 3)
    client = None

    def on_start(self):
        """Inicializa o cliente gRPC."""
        self.client = GrpcClient("localhost:50051")

    @task
    def test_grpc_get_users(self):
        """Teste da chamada gRPC GetUsers."""
        self.client.call(
            "GetUsers", service_pb2.google_dot_protobuf_dot_empty__pb2.Empty()
        )


# python -m grpc_tools.protoc -I./proto --python_out=. --grpc_python_out=. ./proto/service.proto
