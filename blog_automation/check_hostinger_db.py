import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("217.21.74.188", port=65002, username="u390470426", password="Prmarketing@10786")

# Test MySQL command with credentials
stdin, stdout, stderr = ssh.exec_command("mysql -u u390470426_techandcar -p'#T@GIh5Z' -e 'SHOW DATABASES;'")
print("MySQL Databases:")
print(stdout.read().decode())
print("Stderr:")
print(stderr.read().decode())

ssh.close()
