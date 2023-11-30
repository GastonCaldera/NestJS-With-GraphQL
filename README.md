## Description

This is a project created with NestJS and GraphQL, allowing you to manage your employees and keep a record every time one of your employees gets a new role or a new boss. In this project, you'll use GraphQL to create and edit employee profiles.

## Installation
To install the project, simply execute the following command. IMPORTANT: You must create a .env file; you can use .env.example as a guide.

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Usage

In this project, you will find 3 main queries and 2 mutations. Let's start by explaining the queries and then proceed to the mutations. For more information, you can visit your_path:3000/graphQL to see each query and mutation in greater detail.

## Queries
Here are some examples of what you can do with the queries. There are 6 queries: workers, worker, logs, log, roles, role. Log, worker, and role receive a parameter called id.

```bash
query {
  workers {
    id
    firstName
    lastName
    version
    role {
      id
      name
    }
    boss {
      id
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
}

query {
  roles {
    id
    name
    created_at
  }
}

query {
  logs {
    name
    new_role {
      id
      name
    }
    user {
      firstName
      lastName
    }
    new_boss {
      firstName
      lastName
      version
    }
  }
}
```

## Mutations
In the mutations, we have only two: createWorker and editWorkerRole. CreateWorker has two important parameters, ROLE, and BOSS. The role is mandatory, but the boss is not. If the boss is not specified, the role of that person must be a manager. Managers are the only workers who do not have a direct boss. There are 4 roles: intern, employee, supervisor, and manager. Only supervisors and managers can be bosses.

```bash
mutation {
	createWorker(input: {
    firstName: "",
    lastName: "", 
    role: ""
    email: "",
    version: 0,
    boss: ""
  }){
    id
    firstName
    lastName
  }
}
```

The editWorkerRole mutation is used to edit the role of a person or edit the boss. The same rule applies as in createWorker: the bossId parameter is not mandatory if the role sent is manager. Every time a change in the user's role or a change of boss occurs, a log with that change information will be created, and the user's version will be updated from 0 to 1 and so on.

```bash
mutation {
  editWorkerRole(input: {
    id: "", 
    roleId: "", 
    bossId: ""
  }){
    id
    firstName
  }
}
```

## Test

```bash
# unit tests
$ yarn run test
```

## License

Nest is [MIT licensed](LICENSE).
