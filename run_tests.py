import subprocess
import os
import sys


def run_service_and_tests(service_name, host, users=10, spawn_rate=2, run_time="1m"):
    try:
        results_dir = "results"
        os.makedirs(results_dir, exist_ok=True)

        os.chdir(service_name)
        print(f"[INFO] Navegando para o diretório: {os.getcwd()}")

        print(f"[INFO] Serviço {service_name} iniciado. Executando testes de carga...")

        result_file_base = os.path.join("..", results_dir, f"{service_name}")

        locust_command = [
            "locust",
            "--host",
            host,
            "--users",
            str(users),
            "--spawn-rate",
            str(spawn_rate),
            "--run-time",
            run_time,
            "--headless",
            "--csv",
            result_file_base,
        ]
        subprocess.run(locust_command, check=True)

    except Exception as e:
        print(f"[ERROR] Ocorreu um erro: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python script.py <serviço> <locustfile>")
        sys.exit(1)

    service_name = sys.argv[1]
    host = "http://localhost:8000"
    users = 500
    spawn_rate = 20
    run_time = "1m"

    run_service_and_tests(service_name, host, users, spawn_rate, run_time)


# python run_tests.py <service_name>
