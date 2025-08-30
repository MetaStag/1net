import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { ContractSpec } from "./SmartContractBuilder";
import { useToast } from "@/hooks/use-toast";

interface ContractInputProps {
  onSpecGenerated: (spec: ContractSpec) => void;
}

export const ContractInput: React.FC<ContractInputProps> = ({ onSpecGenerated }) => {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const examples = [
    "I want an ERC20 token called PrimoCoin with 1,000,000 supply",
    "Create an NFT collection called CyberPunks with 10,000 max supply",
    "ERC20 token named DevCoin, 50M supply, burnable and pausable",
    "NFT marketplace token with royalties and batch minting"
  ];

  const parseUserInput = async (userInput: string): Promise<ContractSpec> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const lowercaseInput = userInput.toLowerCase();
    
    // Determine contract type
    let type: 'ERC20' | 'ERC721' | 'ERC1155' = 'ERC20';
    if (lowercaseInput.includes('nft') || lowercaseInput.includes('721') || lowercaseInput.includes('collection')) {
      type = 'ERC721';
    } else if (lowercaseInput.includes('1155') || lowercaseInput.includes('multi')) {
      type = 'ERC1155';
    }

    // Extract name
    const nameMatch = userInput.match(/(?:called|named|name)\s+([A-Za-z][A-Za-z0-9]*)/i);
    const name = nameMatch ? nameMatch[1] : (type === 'ERC20' ? 'MyToken' : 'MyNFT');

    // Extract symbol
    const symbol = name.substring(0, 4).toUpperCase();

    // Extract supply
    const supplyMatch = userInput.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(?:million|m|k|thousand)?/i);
    let supply = '1000000';
    if (supplyMatch) {
      supply = supplyMatch[1].replace(/,/g, '');
      if (userInput.toLowerCase().includes('million') || userInput.toLowerCase().includes('m ')) {
        supply = (parseInt(supply) * 1000000).toString();
      } else if (userInput.toLowerCase().includes('thousand') || userInput.toLowerCase().includes('k ')) {
        supply = (parseInt(supply) * 1000).toString();
      }
    }

    // Extract features
    const features: string[] = [];
    if (lowercaseInput.includes('burnable')) features.push('burnable');
    if (lowercaseInput.includes('pausable')) features.push('pausable');
    if (lowercaseInput.includes('mintable')) features.push('mintable');
    if (lowercaseInput.includes('royalt')) features.push('royalties');
    if (lowercaseInput.includes('batch')) features.push('batch');

    return {
      type,
      name,
      symbol,
      supply: type === 'ERC20' ? supply : undefined,
      description: userInput,
      features
    };
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe your smart contract requirements",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const spec = await parseUserInput(input);
      onSpecGenerated(spec);
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to parse your requirements. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Describe Your Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your smart contract in plain language..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isProcessing || !input.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                AI Processing...
              </>
            ) : (
              <>
                Generate Contract Spec
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Examples Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Example Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Try these example prompts or create your own:
          </p>
          {examples.map((example, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-muted/50 border border-border cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => setInput(example)}
            >
              <p className="text-sm">{example}</p>
            </div>
          ))}
          
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-semibold">Supported Features:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">ERC20 Tokens</Badge>
              <Badge variant="secondary">ERC721 NFTs</Badge>
              <Badge variant="secondary">ERC1155 Multi</Badge>
              <Badge variant="secondary">Burnable</Badge>
              <Badge variant="secondary">Pausable</Badge>
              <Badge variant="secondary">Mintable</Badge>
              <Badge variant="secondary">Royalties</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};