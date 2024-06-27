import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function Screen() {
  return (
    <ScrollView contentContainerClassName='flex-1 justify-center items-center p-6 gap-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className={'min-w-80'}>
            <Text>Se connecter</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[300px] sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Se connecter</DialogTitle>
          </DialogHeader>
          <Input placeholder={'Email'} textContentType={'emailAddress'} />
          <Input placeholder={'Mot de passe'} textContentType={'password'} secureTextEntry={true} />
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>Se connecter</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'} className={'min-w-80'}>
            <Text>Créer un compte</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[300px] sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Créer un compte</DialogTitle>
          </DialogHeader>
          <Input placeholder={'Email'} textContentType={'emailAddress'} />
          <Input placeholder={'Mot de passe'} textContentType={'password'} secureTextEntry={true} />
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>Créer un compte</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
}
