/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Row, Col, Container, Toast } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import ListPage from "./screens/List";
import CreatePage from "./screens/Create";

export type ToastType = "success" | "error";
export type ShowToastFunction = (type: ToastType, message: string) => void;
export type ToastData = {
  type: boolean | ToastType;
  message: string;
};

function App() {
  // NOTE Toast State ve Yönetme
  const [toast, setToast] = React.useState<ToastData>({
    type: false,
    message: "",
  });

  const showToast: ShowToastFunction = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: false, message: "" }), 1500);
  };

  return (
    <Container className="mt-3 position-relative px-4 px-md-0">
      <AppBar />

      <Row className="d-flex justify-content-center mt-3">
        <Col sm md={8} lg={6}>
          <Switch>
            <Route path="/create">
              <CreatePage showToast={showToast} />
            </Route>
            <Route path="/">
              <ListPage showToast={showToast} />
            </Route>
          </Switch>
        </Col>
      </Row>

      <div className="d-flex align-items-center justify-content-center toast-container">
        <Toast show={!!toast.type} className={`toast ${toast.type || ""}`}>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
}

export default App;
