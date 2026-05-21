import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../apps/hooks";
import { changeMode } from "../redux/app/app.slide";
import { useEffect } from "react";

enum ELightDarkMode {
  Light = "light",
  Dark = "dark",
}

function TextLinkExample() {
  const appMode = useAppSelector((state) => state.appMode.appMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", appMode);
  }, [appMode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={appMode}>
      <Container>
        <Navbar.Brand href="#home">Redux Learning</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Form.Check
              type="switch"
              id="custom-switch"
              value={appMode}
              label={
                appMode === ELightDarkMode.Light ? "Light Mode" : "Dark Mode"
              }
              onChange={(e) =>
                dispatch(
                  changeMode(e.target.value === "light" ? "dark" : "light"),
                )
              }
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
