/*
		@useConversation is used to manage the conversation state.
		@useParams is a custom hook that is used to retrieve the URL parameters.

		The conversation ID is retrieved from the URL parameters and
		is used to determine if the conversation is open.
*/

import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  // retrieve URL parameters
  const params = useParams();

  // returns the conversation ID based on URL
  // will recalculate if the URL changes
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  // determine if the conversation is open by converting conversationId to a boolean
  // will recalculate if the conversation ID changes
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  // return the conversation state (boolean and ID)
  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
