interface IParams {
    conversationId: string;
  }

  const conversationId = async ({ params }: { params: IParams }) => {
  
    return ( 
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
        </div>
      </div>
    );
  }
  
  export default conversationId;