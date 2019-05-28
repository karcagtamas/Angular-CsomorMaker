import { PersonCountPipe } from './person-count.pipe';

describe('PersonCountPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonCountPipe();
    expect(pipe).toBeTruthy();
  });
});
