from locust import HttpUser, task, between


class LoadTestUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_soap(self):
        soap_body = """<?xml version="1.0"?>
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                            xmlns:tns="http://example.com/streaming">
            <soapenv:Header/>
            <soapenv:Body>
                <tns:GetAllUsersRequest/>
            </soapenv:Body>
            </soapenv:Envelope>
        """
        headers = {
            "Content-Type": "text/xml",
            "SOAPAction": "http://example.com/streaming#GetAllUsers",
        }
        response = self.client.post("/", data=soap_body, headers=headers)
        if response.status_code != 200:
            print(f"SOAP Error: {response.text}")
