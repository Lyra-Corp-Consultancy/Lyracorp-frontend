// import { useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
// import axios from "axios";
// import { useQuery } from "../../utils/hooks/hooks";

function Dashboard() {
  // const params = useQuery()
  // useEffect(() => {
  //   axios
  //     .post(`https://accounts.zoho.com/oauth/v2/token?code=${params.get("code")}&client_id=1000.MX1XBMHGWRK580V94HJPQO77FZC75C&client_secret=3dcb0c8b99e57aeaca2f8154e76386aef458c92d2c&redirect_uri=http://localhost:5173/dashboard&grant_type=authorization_code&scope=ZohoBooks.fullaccess.all`)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, []);
  return (
    <div className="w-screen min-h-screen">
      <NavigationBar />
      {/* <a href="https://accounts.zoho.com/oauth/v2/token?code=1000.62399242824b2826d5cb8a243f2bf212.db4d884b48c8ff1ecc7f75245f23eedc&client_id=1000.MX1XBMHGWRK580V94HJPQO77FZC75C&client_secret=3dcb0c8b99e57aeaca2f8154e76386aef458c92d2c&redirect_uri=http://localhost:5173/dashboard&grant_type=authorization_code">test</a> */}
    </div>
  );
}

export default Dashboard;
