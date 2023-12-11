import { Card, HStack, IconButton, Text, SimpleGrid } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';

const MatchByYmd = () => {
    const dispatch = useAppDispatch();
    const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
    const season = useAppSelector((state: RootState) => state.matchData.season);
  
    const matchesByYmd: Record<string, any[]> = {};
    filteredMatch.forEach((match) => {
      const ymd = match.ymd;
      if (!matchesByYmd[ymd]) {
        matchesByYmd[ymd] = [];
      }
      matchesByYmd[ymd].push(match);
    });
  
    return (
        <div className='grid md:grid-cols-1 grid-cols-2 gap-4'>
      <div>
      <SimpleGrid columns={4} spacing={10}>
        {Object.entries(matchesByYmd).map(([ymd, matches]) => (
          <div key={ymd} className='mb-4'>
            <Text as='b' color='black' className='pl-4'>{ymd}</Text>
            <div className='p-4'>
              {matches.map((match: any) => (
                <Card key={match.schedule_key} variant='outline' padding='2'>
                  <HStack spacing='24px'>
                    <Text as="b" color='#747c83'>{match.card}</Text>
                    <IconButton
                      aria-label='Search database'
                      size='lg'
                      icon={<ChevronRightIcon />}
                    />
                  </HStack>
                </Card>
              ))}
            </div>
          </div>
        ))}
         </SimpleGrid>
      </div>
     
      </div>
    );
  };
  
  export default MatchByYmd;
  