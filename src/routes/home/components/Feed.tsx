import { useQuery } from '@tanstack/react-query';
import generator from 'megalodon';
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';
import { Instance } from '$atoms/accounts';

type Props = {
  instance: Instance;
};

const Feed = ({ instance }: Props) => {
  const [client] = useState(() => generator(instance.type, instance.url, instance.accessToken));
  const { data } = useQuery(['feed', instance.id], () => client.getHomeTimeline({ limit: 40 }), { suspense: true });
  const timeline = data?.data;

  if (!timeline) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {timeline.map((feed, i) => (
        <Card key={i}>
          <CardHeader className="flex gap-3">
            <Image alt="nextui logo" height={40} radius="sm" src={feed.account.avatar} width={40} />
            <div className="flex flex-col">
              <p className="text-md">{feed.account.display_name}</p>
              <p className="text-small text-default-500">{feed.account.username}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p dangerouslySetInnerHTML={{ __html: feed.content }} />
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
