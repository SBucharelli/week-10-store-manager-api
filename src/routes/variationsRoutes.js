
const router = require('express').Router();
const { deleteVariation, updateVariation, createVariation, getVariations } = require('../database/variations');

router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getVariations());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
router.post('/', async (apiRequest, apiResponse) => {
    const newVariation = apiRequest.body;
    await createVariation(newVariation);
    apiResponse.send({
        message: 'New variation created.',
        allVariations: await getVariations(),
        thanks: true
    });
});

// endpoint to delete a variation
router.delete('/:variationId', async (apiRequest, apiResponse) => {
    await deleteVariation(apiRequest.params.variationId);
    apiResponse.send({ message: 'Variation deleted.' });
});

// endpoint to update a variation
router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedVariation = apiRequest.body;
    console.log({ updatedVariation })
    await updateVariation(apiRequest.params.id, updatedVariation);
    apiResponse.send({ message: 'Variation updated.' });
});

module.exports = router;



