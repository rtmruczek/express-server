import fs from 'fs';

jest.spyOn(fs, 'readFileSync').mockReturnValue('');
