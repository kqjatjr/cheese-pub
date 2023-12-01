import { useInfiniteQuery } from '@tanstack/react-query';
import generator from 'megalodon';
import React, { useMemo, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Spacer,
  ScrollShadow,
  Avatar,
} from '@nextui-org/react';
import { MdChatBubble, MdReplay, MdOutlineStarPurple500 } from 'react-icons/md';
import InfiniteLoading from '$components/InfiniteLoading';
import { Instance } from '$atoms/accounts';
import { useAccountList } from '$hooks/useAccountList';

type Props = {
  instance: Instance;
};

const Feed = ({ instance }: Props) => {
  const [client] = useState(() => generator(instance.type, instance.url, instance.accessToken));
  const { getAccount } = useAccountList();
  const account = getAccount(instance);
  const serverName = account?.url.split('/')[2];
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['feed', instance.id],
    async ({ pageParam }) => {
      return client.getHomeTimeline({ limit: 40, ...pageParam });
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.data.length > 0,
      getNextPageParam: (lastPage) => lastPage.data.length > 0,
      suspense: true,
    },
  );

  const timeline = useMemo(() => data?.pages.flatMap((v) => v.data), [data]);

  const handleFetchNextPage = () =>
    fetchNextPage({
      pageParam: {
        max_id: timeline?.[timeline.length - 1].id,
      },
    });

  if (!timeline || !account) {
    return null;
  }

  return (
    <div
      className="w-instance h-full bg-mainColor p-3 rounded-[14px] max-w-[360px] flex flex-col gap-3 min-w-[360px]"
      key={instance.id}
    >
      <div className="flex items-center gap-3">
        <div>
          <Avatar radius="md" key={account.id} className="cursor-pointer" src={account.avatar} />
        </div>
        <p>{account.username + '@' + serverName}</p>
      </div>
      <ScrollShadow hideScrollBar className="h-full w-full overflow-x-hidden  flex flex-col items-center gap-1">
        {timeline.map((feed, i) => (
          <div key={i} className="min-w-full">
            <Card className="bg-feedBoxColor w-full">
              <CardHeader className="flex gap-3">
                <Image alt="nextui logo" height={40} radius="sm" src={feed.account.avatar} width={40} />
                <div className="flex flex-col">
                  <p className="text-md">{feed.account.display_name}</p>
                  <p className="text-small text-default-500">{feed.account.username}</p>
                  <p className="text-small text-default-500">{feed.created_at}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p dangerouslySetInnerHTML={{ __html: feed.content }} />
                <div className="flex justify-center items-center">
                  {feed.media_attachments.length > 0 &&
                    feed.media_attachments.map((item) => {
                      if (item.type === 'image') {
                        return <Image key={item.id} className="mt-[10px]" src={item.preview_url || ''} />;
                      }
                    })}
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex items-center gap-2 h-full w-full">
                  <MdChatBubble size={20} className="hover:scale-120 hover:text-purple-500 cursor-pointer" />
                  <span className="font-bold">{feed.replies_count}</span>
                  <MdReplay size={20} className="hover:scale-120 hover:text-green-500 cursor-pointer" />
                  <span className="font-bold">{feed.reblogs_count}</span>
                  <MdOutlineStarPurple500 size={20} className="hover:scale-120 hover:text-orange-300 cursor-pointer" />
                  <span className="font-bold">{feed.favourites_count}</span>
                </div>
              </CardFooter>
            </Card>
            <Spacer y={2} />
          </div>
        ))}
        {hasNextPage && <InfiniteLoading onShow={handleFetchNextPage} />}
      </ScrollShadow>
    </div>
  );
};

export default Feed;
