# data

This library contains all data related logic such as transforming data in a generic way and creating data models.

## Notes

- Because we use just simple mock json file this library also contain a api client service.
- Ideally we could also have a specific api client library that abstracts all api related calls such authentication, building requests and other api related logic.
- It also should have a service for each backend service eg `TransactionApiService` should be a frontend representation of `/api/transaction` in case of rest, this way the code related to api calls should be easy to maintain and scale

## Running unit tests

Run `nx test data` to execute the unit tests.
