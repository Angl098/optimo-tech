import { useState } from 'react';
import style from './Header.module.css'

export const Header = ({
	allProducts,
}) => {

	return (
		<header>
			<h1>Productos</h1>
			<div className={style.containerIcon}>
				<div className={style.containerCartProducts}>
					
						<>
							<div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{product.nameProduct}
											</p>
											<span className='precio-producto-carrito'>
												${product.price}
											</span>
										</div>
									</div>
								))}
							</div>
						
						</>
					
				</div>
			</div>
            
		</header>
        
	);
};