import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {} from 'jasmine';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {JsonDataService} from './data-json.service';

describe("Test bidon", () => {
  it("true is true"),() => {expect(true).toBe(true)};
});
describe('Blog Service', () => {
  let mockBackend: MockBackend;

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        JsonDataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));
  let jsonDataService: JsonDataService;

  it('should return dragonfly array', done => {
    jsonDataService.dragonflies().then(function(value){
      expect(typeof(value)).toBe('array');
      console.log('test');
    });
  });
});
