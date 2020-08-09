
const router = require('express').Router();
const { deleteProductType, updateProductType, createProductType, getProductTypes } = require('../database/product-types');

router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getProductTypes());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
router.post('/', async (apiRequest, apiResponse) => {
    const newProductType = apiRequest.body;
    await createProductType(newProductType);
    apiResponse.send({
        message: 'New productType created.',
        allProductTypes: await getProductTypes(),
        thanks: true
    });
});

// endpoint to delete a productType
router.delete('/:productTypeId', async (apiRequest, apiResponse) => {
    await deleteProductType(apiRequest.params.productTypeId);
    apiResponse.send({ message: 'ProductType deleted.' });
});

// endpoint to update a productType
router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedProductType = apiRequest.body;
    console.log({ updatedProductType })
    await updateProductType(apiRequest.params.id, updatedProductType);
    apiResponse.send({ message: 'ProductType updated.' });
});

module.exports = router;



