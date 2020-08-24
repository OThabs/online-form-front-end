import { TestBed, getTestBed, async } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Person } from '../models';



describe('CurrencyConverterApiService', () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [DataService],
            imports: [HttpClientTestingModule]
        });
        service = getTestBed().get(DataService);
        httpMock = getTestBed().get(HttpTestingController);
    }));

    afterEach(() => {
        httpMock.verify();
    });

    it('should return an Observable response object when getUsers is invoked', () => {
        expect(service).toBeDefined();

        const getUsersResponse: Person[] = [
            {
                idNumber: "9111115891080",
                fullName: "Josh Oth",
                id: "1"
            }
        ]

        service.getUsers().subscribe(res => {
            expect(res).toBeDefined();
        });

        const endPoint = 'http://localhost:8080/persons';

        const req = httpMock.expectOne(endPoint);
        expect(req.request.method).toBe('GET');
        req.flush(getUsersResponse);
    });

    it('should return an Observable response object when createUsers is invoked', () => {
        expect(service).toBeDefined();

        const createUserResponse: Person =
        {
            idNumber: "9111115891080",
            fullName: "Josh Oth",
            id: "1"
        };

        const payload: Person = {
            idNumber: "9111115891080",
            fullName: "Josh Oth"
        };


        service.createUsers(payload).subscribe(res => {
            expect(res).toBeDefined();
        });

        const endPoint = 'http://localhost:8080/persons';

        const req = httpMock.expectOne(endPoint);
        expect(req.request.method).toBe('POST');
        req.flush(createUserResponse);
    });

});