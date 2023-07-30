import Sidebar from "./Sidebar";
import Header from "./components/Header";
import FileTable from "./components/Table";
import supabase from "./config/supabaseClient";

const App = () => {
  console.log(supabase)

  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <FileTable />
      </div>
    </div>
  );
}

export default App;
