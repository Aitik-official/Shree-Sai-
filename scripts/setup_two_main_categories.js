const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://infotechpranavi_db_user:SqVG7qE4H4ofvNw4@cluster0.ir7cy5f.mongodb.net/skygo?retryWrites=true&w=majority&appName=Cluster0';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const Settings = mongoose.models.Settings || mongoose.model('Settings', new mongoose.Schema({}, { strict: false }));
  const Package = mongoose.models.Package || mongoose.model('Package', new mongoose.Schema({}, { strict: false }));

  await mongoose.connection.db.collection('settings').updateOne(
    {},
    {
      $set: {
        customGroups: [
          { slug: 'varanasi', label: 'Varanasi' },
          { slug: 'nepal', label: 'Nepal' },
        ],
        hiddenBuiltinGroups: ['water', 'land-motor', 'land-physical', 'sky', 'upcoming-tours'],
        customSubcategories: [],
        customMiniCategories: [],
      },
    },
    { upsert: true }
  );
  console.log('Updated Settings with 2 main categories: Varanasi & Nepal');

  // 2. Update Packages
  const nepalResult = await Package.updateMany(
    { $or: [{ place: 'nepal' }, { location: 'nepal' }, { title: { $regex: /nepal/i } }] },
    { $set: { packageCategory: 'Nepal', place: 'nepal', location: 'nepal', packageMiniCategory: '' } }
  );
  console.log('Updated Nepal packages:', nepalResult.modifiedCount);

  const varanasiResult = await Package.updateMany(
    { $or: [{ place: 'varanasi' }, { location: 'varanasi' }, { title: { $regex: /varanasi|kashi|ayodhya/i } }] },
    { $set: { packageCategory: 'Varanasi', place: 'varanasi', location: 'varanasi', packageMiniCategory: '' } }
  );
  console.log('Updated Varanasi packages:', varanasiResult.modifiedCount);

  const allPkgs = await Package.find({}, { title: 1, packageCategory: 1, place: 1, location: 1 });
  console.log('Current packages in DB:', JSON.stringify(allPkgs, null, 2));

  await mongoose.disconnect();
  console.log('Done!');
}

main().catch(console.error);
