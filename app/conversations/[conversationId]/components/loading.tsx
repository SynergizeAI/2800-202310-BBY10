import LoadingModal from "../../../components/LoadingModal";
import SyncLoader from "react-spinners/SyncLoader";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='animate-spin'>
        <AiOutlineLoading3Quarters size={40}/>
      </div>
    </div>
  );
};

export default Loading;
