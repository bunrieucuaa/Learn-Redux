import HeaderNavBar from "./components/HeaderNavBar";
import TabContent from "./components/TabContent";

function App() {
  return (
    <>
      <HeaderNavBar />
      <div style={{ paddingInline: "60px" }}>
        <TabContent />
      </div>
    </>
  );
}

export default App;
