import React,{useState,useEffect} from 'react'
import * as api from "../../api/index.js";
import {Container,Row,Col,Card} from 'react-bootstrap';

function HomeCom() {
  const [totalProducts, setTotalProducts] = useState(null);
  
  useEffect(() => {
    const getTotalProducts = async () => {
      try {
        const response = await api.urunToplamlarıGetir();
        setTotalProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalProducts();
  }, []);


  return (
    <div>
      <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="text-center align-items-center pt-5 pb-2 mb-3 border-bottom">
          <div>
            <h2 className='text-center h2'>HES OTOMOTİV ADMİN PANELİ </h2>
          </div>
        </div>
        

      <Container>
        <Row>
          <Col className='text-center d-flex justify-content-center mt-2 p-2' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Toplam Ürün Kalem Sayısı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalProductTypes}
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Adet Ürün Çeşidi Kayıtlı</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col className='text-center d-flex justify-content-center mt-2 p-2 ' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Toplam Ürün Stok Sayısı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalProducts}
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Adet Stoklarımızda Ürün Bulunuyor</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col className='text-center d-flex justify-content-center mt-2 p-2' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Aktif Ürün Sayısı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalActiveProducts}
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Adet Aktif Ürün Bulunuyor</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col className='text-center d-flex justify-content-center mt-2 p-2' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Pasif Ürün Sayısı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalPassiveProducts}
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Adet Ürün Pasif Durumda</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col className='text-center d-flex justify-content-center mt-2 p-2' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Kayıtlı Ürünlerin Toplam Maliyet Fiyatı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalCostPrice}.00 ₺
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Toplam Maliyet Fiyatı</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col className='text-center d-flex justify-content-center mt-2 p-2' xl={6}>
            <Card border="primary" style={{ width: '18rem' }}>
              <Card.Header className='fw-bold'>Kayıtlı Ürünlerin Toplam Satış Fiyatı</Card.Header>
              <Card.Body>
                <Card.Text className='card-text'>
                  {totalProducts?.totalSalesPrice}.00 ₺
                </Card.Text>
                <Card.Footer>
                  <small className="text-muted">Toplam Satış Fiyatı</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      </main>
    </div>
  )
}

export default HomeCom