# timeout-decorator

A TypeScript decorator to enforce a time limit on the execution of async methods.

### Step 1: Installation

You can install the package via npm:

```bash
npm install timeout-decorator
```

### Step 2: Update tsconfig.json

After installing the package, you need to enable the experimentalDecorators option in your tsconfig.json file to use decorators in TypeScript.

Add the following line to your tsconfig.json:
```typescript
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### Usage Example

Consider a scenario where you have an async method `fetchData` within a class `DataFetcher`, which fetches data from an external API using `await`. You want to ensure any errors during this asynchronous operation are handled gracefully.

```typescript
import { Timeout } from 'timeout-decorator';

class DataFetcher {
    @Timeout(5000) // 5 seconds timeout
    async fetchData() {
        // Fetch data from an API
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        // Process the data
        return data;
    }
}
```

In this example, the Timeout decorator ensures that the fetchData method completes within 5 seconds. If the method takes longer than the specified timeout duration, it will be rejected with a timeout error


### Additional Notes


- The Timeout decorator should be applied to async methods.
- Specify the timeout duration in milliseconds as the parameter to the Timeout decorator.
- If the method completes within the specified timeout duration, its result is returned as usual.
- If the method exceeds the timeout duration, it will be rejected with a timeout error. You can handle this error using a .catch() block when calling the method.


