import { use, useState } from "react";
// import { Button } from 'antd'
// import { UpCircleOutlined } from '@ant-design/icons'
// import Comp1 from './components/Comp1'
// import Comp2 from './components/Comp2'
import "./App.css";

import { useRoutes, Link } from "react-router-dom";
import router from "./router";
import HomePage from "./view/HomePage";

function App() {
  // const [count, setCount] = useState(0);
  // const outlet = useRoutes(router);
  return <HomePage />;
}

export default App;
