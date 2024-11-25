from locust import HttpUser, task, between


class LoadTestUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_rest(self):
        self.client.get("/users")
