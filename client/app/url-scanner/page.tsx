'use client'
import ScannerForm from '@/components/ScannerForm';
import ResultCard from '@/components/ResultCard';
import MetadataPanel from '@/components/MetadataPanel';
import { scanURL } from '@/app/utils/api'

export default function URLScanner() {
  const handleScan = async (url: string) => {
    // Connect to backend in Phase 2
    const result = await scanURL(url); 
    return result;
  };

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-6">URL Security Scanner</h1>
      
      <ScannerForm 
        placeholder="Enter suspicious URL" 
        onScan={handleScan} 
      />
      
      <div className="mt-8 w-full grid grid-cols-2 gap-6">
        <ResultCard 
          title="Scan Result" 
          status="Danger" 
          confidence={92} 
          redFlags={['Suspicious TLD', 'Punycode detected']}
        />
        
        <MetadataPanel 
          domain="phish-example.com"
          age="1 month"
          sslValid={false}
          ipLocation="Unknown"
          subdomains={5}
        />
      </div>
    </div>
  );
}