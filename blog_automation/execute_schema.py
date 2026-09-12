import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("217.21.74.188", port=65002, username="u390470426", password="Prmarketing@10786")

# Read local schema.sql
with open(r"C:\hk\prmarketing\backend\database\schema.sql", "r", encoding="utf-8") as f:
    sql_content = f.read()

# Upload schema.sql to server
sftp = ssh.open_sftp()
with sftp.file("domains/prmarketingventures.com/public_html/backend/database/schema.sql", "w") as f:
    f.write(sql_content)
sftp.close()

# Execute schema.sql into database
stdin, stdout, stderr = ssh.exec_command("mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar < domains/prmarketingventures.com/public_html/backend/database/schema.sql")
print("Schema Execution:")
print("Stdout:", stdout.read().decode())
print("Stderr:", stderr.read().decode())

# Check tables created
stdin, stdout, stderr = ssh.exec_command("mysql -u u390470426_techandcar -p'#T@GIh5Z' u390470426_techandcar -e 'SHOW TABLES;'")
print("Tables in u390470426_techandcar:")
print(stdout.read().decode())

ssh.close()
