from locust import HttpUser, task, between


class LoadTestUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_graphql(self):
        graphql_query = {
            "query": """
                query {
                    users {
                        id
                        name
                    }
                }
            """
        }
        self.client.post("/graphql", json=graphql_query)
