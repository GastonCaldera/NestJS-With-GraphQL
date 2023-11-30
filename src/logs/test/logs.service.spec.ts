import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { LogsService } from '../services/logs.service';

const mockLogModel = {
  find: jest.fn(),
};

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getModelToken('Log'),
          useValue: mockLogModel,
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of Logs', async () => {
      const mockLogs = [
        {
          id: '65667febe24290097e5bc692',
          name: 'Change Role',
          user: {
            id: '65663b56c7d005b1d4221a40',
            firstName: 'Pedro',
          },
        },
        {
          id: '65675149053d2aad4b171b63',
          name: 'Change Role',
          user: {
            id: '656614ed5cc0b1663d0a333a',
            firstName: 'Pedro',
          },
        },
      ];
      mockLogModel.find.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => ({
              populate: () => ({
                populate: () => ({
                  exec: jest.fn().mockResolvedValueOnce(mockLogs),
                }),
              }),
            }),
          }),
        }),
      }));

      const result = await service.findAll();

      expect(result).toEqual(mockLogs);
    });
  });
});
