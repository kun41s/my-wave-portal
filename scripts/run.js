const main = async () => {
    
    const [owner, randomPerson] = await ethers.getSigners();

    const waveContractFactory = await ethers.getContractFactory("WavePortal");  //creating instance of contract
    const waveContract = await waveContractFactory.deploy();        //deploying instance
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);    //address of the person deploying contract

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
}

const runMain = async() => {
    try {
        await main();   
        process.exit(0);    // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1);    // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
}

runMain();