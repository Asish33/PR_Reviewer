import LogOutButton from "../components/logoutButton"

const Dashboard=()=>{

    function Logoutfun(){
        window.location.href =
          "https://pr-reviewer-backend.onrender.com/logout";
          console.log("hi")
    }

    return (
      <div className="bg-red-300 min-h-full flex justify-center items-center">
        Dashboard
        <LogOutButton onClick={Logoutfun}></LogOutButton>
      </div>
    );
}

export default Dashboard