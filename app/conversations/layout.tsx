import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../_actions/getConversations";
import getUser from "../_actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUser();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
      <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
