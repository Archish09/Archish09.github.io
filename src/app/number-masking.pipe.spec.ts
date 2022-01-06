import { NumberMaskingPipe } from './number-masking.pipe';

describe('NumberMaskingPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberMaskingPipe();
    expect(pipe).toBeTruthy();
  });
});
