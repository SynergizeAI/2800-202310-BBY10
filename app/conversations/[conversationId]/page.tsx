import getConversationById from "@/app/_actions/getConversationById";
import getMessages from "@/app/_actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import EmptyState from "@/app/components/EmptyState";
import { Suspense } from "react";
import Loading from "./components/loading";

interface IParams {
  conversationId: string;
}

const conversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Suspense fallback={<Loading />}>
          <Header conversation={conversation} />
          <Body initialMessages={messages} />
          <Form />
        </Suspense>
      </div>
    </div>
  );
};

export default conversationId;
