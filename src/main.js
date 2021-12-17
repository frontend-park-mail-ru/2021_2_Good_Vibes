import ProductModel from './models/ProductModel';
import ProductPresenter from './presenters/ProductPresenter';

const application = document.getElementById('application');

const productPresenter = new ProductPresenter(application, ProductView, ProductModel);