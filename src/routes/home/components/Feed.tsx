import { useInfiniteQuery } from '@tanstack/react-query';
import generator from 'megalodon';
import React, { Fragment, useMemo, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spacer } from '@nextui-org/react';
import InfiniteLoading from '$components/InfiniteLoading';
import { Instance } from '$atoms/accounts';

type Props = {
  instance: Instance;
};

const Feed = ({ instance }: Props) => {
  const [client] = useState(() => generator(instance.type, instance.url, instance.accessToken));
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['feed', instance.id],
    ({ pageParam }) => {
      return client.getHomeTimeline({ limit: 40, ...pageParam });
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.data[0].id,
      getNextPageParam: (lastPage) => lastPage.data[lastPage.data.length - 1].id,
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

  if (!timeline) {
    return null;
  }

  return (
    <div className="h-full overflow-auto">
      {timeline.map((feed, i) => (
        <Fragment key={i}>
          <Card>
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
            </CardBody>
            <Divider />
            <CardFooter>
              <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
                {/* Visit source code on GitHub. */}
              </Link>
            </CardFooter>
          </Card>
          <Spacer y={2} />
        </Fragment>
      ))}
      {hasNextPage && <InfiniteLoading onShow={handleFetchNextPage} />}
    </div>
  );
};

export default Feed;