import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-pagamento-pay-pal',
  templateUrl: './pagamento-pay-pal.page.html',
  styleUrls: ['./pagamento-pay-pal.page.scss'],
})
export class PagamentoPayPalPage implements OnInit {
  
  paymentAmount: string = 'total';
  currency: string = 'BRL';
  currencyIcon: string = 'R$';
  total: number;
  
  constructor(private payPal: PayPal,
              private car : CarrinhoService) {
    
                this.total = this.car.total();
  }

  ngOnInit() {
  }


  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AUYFGznQz84ELNV4bI1MRfEZTfG1kqOPv5uTCKxQqRqmluoejm35XgryiR5Xl0YM7HNm3Z8tQ6JLA20G'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.total+"", this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }


}