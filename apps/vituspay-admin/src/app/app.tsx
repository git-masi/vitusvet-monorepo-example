// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Route, Routes, Link } from 'react-router-dom';
import { Transactions } from './transactions/transactions';

export function App() {
  return (
    <>
      {/* START: routes */}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to the example dashboard!</h1>
              <Link to="/transactions">Click here for transactions</Link>
            </div>
          }
        />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
