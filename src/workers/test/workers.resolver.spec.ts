import { Test, TestingModule } from '@nestjs/testing';
import { WorkersResolver } from '../resolvers/workers.resolver';

describe('WorkersResolver', () => {
  let resolver: WorkersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkersResolver],
    }).compile();

    resolver = module.get<WorkersResolver>(WorkersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
