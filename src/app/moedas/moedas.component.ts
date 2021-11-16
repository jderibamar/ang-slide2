import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moedas',
  templateUrl: './moedas.component.html',
  styleUrls: ['./moedas.component.css']
})
export class MoedasComponent implements OnInit 
{
    trxPrecosCp = []
    trxPrecosVd = []
    contCpTrx = 0
    contVdTrx = 0

    constructor() { }

    ngOnInit(): void 
    {
        setInterval( () => { this.ltaLtbTrxBtcBin() }, 10000)
    }


    async apiDadosBin()
    {
        let bin_url = 'https://api.binance.com/api/v3/ticker/bookTicker'
        const response = await fetch(bin_url)
        return response.json()
    }

    async ltaLtbTrxBtcBin()
    {
        const apiData = await this.apiDadosBin()
        const moPrBin = [] //moedas e preços na Binance
        let ultPosCpTrx = 0
        let ultPosVdTrx = 0 //para restringir a apenas à primeira adição sem verificar o preço
      

        if(this.contCpTrx == 0) //pega somente uma ÚNICA vez a pedra de compra
        {
            this.trxPrecosCp.push(apiData[83].bidPrice) //monta o array com a lista de preços
            this.contCpTrx++
        }

        if(this.contVdTrx == 0)
        {
            this.trxPrecosVd.push(apiData[83].askPrice) //monta o array com a lista de preços
            this.contVdTrx++
        }
        

        ultPosCpTrx = this.trxPrecosCp.length - 1 //pega a última posição do array
        ultPosVdTrx = this.trxPrecosVd.length - 1
        
        if(apiData[83].symbol == 'TRXBTC')
        {
            if(this.trxPrecosCp[ultPosCpTrx] < apiData[83].bidPrice)
                this.trxPrecosCp.push(apiData[83].bidPrice)
            
            if(this.trxPrecosVd[ultPosVdTrx] > apiData[83].askPrice)
                this.trxPrecosVd.push(apiData[83].askPrice)
        }
                
        // console.log('Arrary BookTicker - Binance: ', moPrBin)
        // console.log('BookTicker - Binance: ', apiData[83])
        console.log('Lista de preço de COMPRA de TRX na Bin: ', this.trxPrecosCp)
        console.log('Lista de preço de VENDA de TRX na Bin: ', this.trxPrecosVd)
        // console.log('Ùltima pos do array de preços - Comprar: ', ultPosCpTrx)
        // console.log('Stex API: ', apiDataStex)
        // console.log('OrderBook da Gate.io: ', res_apiGateIo)

        // var string = "foo", substring = string.substr(1, 2);

    }

}
