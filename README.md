# Carsties Project Setup Guide

This guide will help you set up the Carsties project, which consists of both frontend and backend components. The frontend is built using **Next.js**, and the backend uses **.NET Core** with Docker for containerization. The project also includes multiple services (Auction, Identity, Search, etc.) that communicate with each other using **RabbitMQ** and databases like **PostgreSQL** and **MongoDB**.

## Prerequisites

Before setting up the project, ensure that you have the following installed on your machine:

- **Docker**: For containerizing the services.
- **Docker Compose**: To orchestrate multi-container applications.
- **nginx**: To manage SSL certificates and routing.
- **mkcert**: For generating local SSL certificates.
- **Node.js**: To run the Next.js frontend.
- **.NET SDK**: To build and run the backend if you need to do development work.

Make sure you have the following Docker images:

- `walex3232/auction-svc:latest`
- `walex3232/search-svc:latest`
- `walex3232/identity-svc:latest`
- `walex3232/gateway-svc:latest`
- `walex3232/bid-svc:latest`
- `walex3232/notify-svc:latest`
- `walex3232/web-app`

You can build these images from the Dockerfiles in the `src/` folder.

---

## Steps to Set Up

### 1. Clone the Repository

Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/walex4242/carsties.git
cd carties
```

### 2. Set Up Databases

The project uses **PostgreSQL** and **MongoDB**. To set them up, follow these steps:

- **PostgreSQL**: Set up a database using the settings provided in the `docker-compose.yml` file. The database credentials are set in the environment variables in the `auction-svc`, `identity-svc`, and other services.
  
- **MongoDB**: Similarly, set up a MongoDB database. The credentials are provided in the `docker-compose.yml` file for the `search-svc`, `bid-svc`, and other services that require it.

**Make sure the connection strings match those in `appsettings.json` and `Program.cs` files** in the respective services. 

Here’s an example for PostgreSQL in the backend:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=postgres;Port=5432;User Id=postgres;Password=postgrespw;Database=auctions"
}
```

### 3. Configure the Hosting Extensions and Program.cs Files

In your backend (inside the `src/` folder), ensure that the database connections are configured in the `Program.cs` and `HostingExtension.cs` files. The `HostingExtension.cs` file is used in the **Identity** service to set up database connections and identity services.

In your `Program.cs` for each service, make sure the database configuration matches your environment setup. For example, in `auction-svc`, the connection string would be:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.ConfigureServices(services =>
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            });
            webBuilder.UseStartup<Startup>();
        });
```

Make sure that all services (`auction-svc`, `search-svc`, etc.) have the correct connection strings in their `Program.cs`.

### 4. Docker Compose Setup

In the root directory, you will find a `docker-compose.yml` file. This file defines the services for **PostgreSQL**, **MongoDB**, **RabbitMQ**, **Identity Service**, **Gateway**, **Bidding Service**, **Auction Service**, and others.

Ensure that the environment variables and connection strings inside the `docker-compose.yml` match the settings in the backend code.

```yaml
  auction-svc:
    image: walex3232/auction-svc:latest
    environment:
      - ConnectionStrings__DefaultConnection=Server=postgres;Port=5432;User Id=postgres;Password=postgrespw;Database=auctions
```

### 5. Setting Up Nginx for SSL

To run your application with SSL locally using **nginx**, follow these steps:

1. Install **nginx** on your system:
   - For Windows, use the [Windows installer for nginx](https://nginx.org/en/docs/windows.html).
   - For macOS, you can install using `brew install nginx`.
   - For Linux, use `sudo apt install nginx`.

2. Create an SSL certificate using **mkcert**. This tool will generate a local CA and SSL certificates for your local development environment:

```bash
mkcert -install
delete files in devcerts folder
cd devcerts
mkcert -key-file olawalecars.local.key -cert-file olawalecars.local.crt app.olawalecars.local api.olawalecars.local id.olawalecars.local
```

Make sure to update your nginx configuration with your domain and corresponding SSL certificates.

### 6. Update Your Hosts File

On your local machine, add the following entries to your `hosts` file to map the local domain to `localhost`:

- For **Windows**, open `C:\Windows\System32\drivers\etc\hosts` in a text editor (with administrator privileges).
- For **macOS/Linux**, open `/etc/hosts` in a text editor.

Add the following:

```plaintext
127.0.0.1   id.olawalecars.local
127.0.0.1   app.olawalecars.local
127.0.0.1   api.olawalecars.local
```

### 7. Running the Project

With everything set up, you can now run the entire application with Docker Compose:

```bash
docker-compose up --build
```

This will start all the services, and you should be able to access:

- **Frontend (Next.js)**: `https://app.olawalecars.local`
- **Identity Service**: `https://id.olawalecars.local`
- **API Gateway**: `https://api.olawalecars.local`

### 8. Accessing the Services

- **RabbitMQ**: Access the RabbitMQ management interface at `http://localhost:15672` with the username `guest` and password `guest`.
- **PostgreSQL**: Access the database at `localhost:5432` with username `postgres` and password `postgrespw`.
- **MongoDB**: Access the MongoDB instance at `localhost:27017`.

---

## Conclusion

Following this guide should help you set up and run the Carsties project on your machine with all the required dependencies. If you encounter any issues, make sure to check the connection strings, Nginx configuration, and that your local domain settings are correct.

---
