import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { HomepageService } from './homepage.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-homepage', // HTML selector for using this component
    templateUrl: './homepage.component.html', // Path to the component's HTML template file
    styleUrls: ['./homepage.component.scss'], // Path to the component's CSS styles file
})

// Define the component class
export class HomepageComponent implements OnInit, OnDestroy {
    protected showCustomerPopup: boolean = false;
    protected regions: any = [];
    protected filterCountries: any = [];
    protected customerData: any = [];
    protected customerPinData: any = [];
    protected showLoader: boolean = false;
    customerForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        region: new FormControl('', Validators.required),
    });
    CustomerPinForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        customers: new FormControl('', Validators.required),
        privacy: new FormControl('', Validators.required),
    });
    protected countries: any = [];
    protected showPinPopup: boolean = false;
    protected imageUrl: any;
    constructor(protected homeService: HomepageService, protected messageService: MessageService, protected fb: FormBuilder) { }
    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            title: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            region: ['', Validators.required],
        });

        this.getRegionDataApi();
    }

    // GET REGION DATA API
    getRegionDataApi() {
        this.showLoader = true;
        this.homeService.getRegionData().subscribe((response: any) => {
            if (response['status-code'] === 200) {
                if (response.data) {
                    const modifiedOptionsArray = Object.keys(response.data).map(key => ({
                        country: response.data[key].country,
                        region: response.data[key].region,
                    }));
                    this.regions = modifiedOptionsArray;
                    const uniqueRegions = this.regions.reduce((acc:any, current:any) => {
                        // Check if the current region is already in the accumulator
                        const isRegionExist = acc.some((region:any) => region.region === current.region);
                        // If the current region is not in the accumulator, add it
                        if (!isRegionExist) {
                          acc.push(current);
                        }
                        return acc;
                      }, []);
                    this.regions = uniqueRegions;
                    this.countries = modifiedOptionsArray;
                } else {
                    this.regions = [];
                }
               
                this.showLoader = false;
            } else {
                this.showLoader = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No response received from the API.',
                });
            }
        })
    }
    // GET REGION DATA API

    // SHOW ADD CUSTOMER POPUP
    addCustomer() {
        this.showCustomerPopup = true;
    }
    // SHOW ADD CUSTOMER POPUP

    // SUBMIT CUSTOMER FORM
    submitForm() {
        this.customerData.push({
            title: this.customerForm.value.title,
            name: this.customerForm.value.name,
            email: this.customerForm.value.email,
            region: this.customerForm.value.region,
            country: this.customerForm.value.country,
        })
        this.closePopup(1);
    }
    // SUBMIT CUSTOMER FORM

    // AFTER SELECT OF REGION
    onRegionChange(event: any) {
        const selectedValue = event;

        // TO ADD DYNAMIC FEILD
        if (!this.customerForm.contains('country')) {
            this.customerForm.addControl('country', this.fb.control('', Validators.required));
        }
        if (selectedValue) {
            this.filterCountries = this.countries.filter((country: any) => country.region == selectedValue);
        }
        // TO ADD DYNAMIC FEILD
    }
    // AFTER SELECT OF REGION


    // CLOSE BOTH POPUP 1 FOR CUSTOMER AND 2 FOR PINS
    closePopup(type: number) {
        if (type === 1) {
            this.showCustomerPopup = false;
            this.customerForm.reset();
            this.customerForm?.get('region')?.setValue('');
            this.customerForm.removeControl('country');
        } else {
            this.showPinPopup = false;
            this.CustomerPinForm.reset();
        }

    }
    // CLOSE BOTH POPUP 1 FOR CUSTOMER AND 2 FOR PINS

    // SHOW PIN POPUP
    addPin() {
        this.imageUrl = '';
        this.showPinPopup = true;
        this.CustomerPinForm = this.fb.group({
            title: ['', Validators.required],
            customers: ['', Validators.required],
            privacy: ['', Validators.required],
        });

    }
    // SHOW PIN POPUP


    // SUBMIT PIN FORM
    submitPinForm() {
        if (!this.imageUrl) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please upload Image.',
            });
            return;
        }
        this.customerPinData.push({
            title: this.CustomerPinForm.value.title,
            customers: this.CustomerPinForm.value.customers,
            privacy: this.CustomerPinForm.value.privacy,
            image: this.imageUrl,
        });
        this.closePopup(2);
    }

    // SUBMIT PIN FORM

    // UPLOAD IMAGE
    uploadFile(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = URL.createObjectURL(file);
                this.imageUrl = imageUrl;
            };
            reader.readAsDataURL(file);
        }
    }
     // UPLOAD IMAGE
}