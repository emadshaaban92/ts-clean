import API from './Adapters/API';
import persistenceInMemoryAdapter from './Adapters/Persistence/InMemory';
import useCases from './Domain/UseCasesImpl';

API(useCases, persistenceInMemoryAdapter);