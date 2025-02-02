# Contributing to JigIT

Welcome to JigIT! We're building a unique jigsaw puzzle game on StarkNet, and we're excited to have you join us. This guide will help you start contributing effectively to both our smart contracts and frontend development.

## Getting Started

First, set up your development environment:

```bash
# Clone the repository
git clone https://github.com/yourusername/jigit.git
cd jigit

# Set up Dojo
curl -L https://install.dojoengine.org | bash
dojoup

# Build contracts
cd contracts
scarb build

# Set up frontend
cd ../frontend
npm install
```

Run the test suites to verify your setup:
```bash
# For contracts
cd contracts
scarb test

# For frontend
cd frontend
npm test
```

## Our Coding Philosophy

We value clean, maintainable, and well-documented code. Here are some examples of what we're looking for:

### Smart Contracts
```cairo
// A well-structured contract example
#[starknet::contract]
mod JigPiece {
    #[storage]
    struct Storage {
        position: Position,
        is_connected: bool,
    }

    // Clear documentation of what the function does
    #[external(v0)]
    fn connect_pieces(
        ref self: ContractState,
        other_piece: ContractAddress
    ) -> bool {
        // Implementation
    }
}
```

### Frontend Components
```typescript
// Clean, typed components
interface PuzzlePieceProps {
  position: Position;
  isSelected: boolean;
}

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  position,
  isSelected
}) => {
  // Implementation
};
```

## Making Changes

1. Create a focused branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with clear messages:
   ```bash
   git commit -m "feat: implement piece connection validation"
   ```

3. Before submitting a pull request, check:
   - All tests pass
   - Code follows our style guidelines
   - Documentation is updated
   - The build succeeds

## Submitting Pull Requests

When creating a pull request:

1. Give it a clear title and description
2. Link any related issues
3. Include screenshots for UI changes
4. Add notes about testing you've done
5. Tag relevant reviewers

## Reporting Issues

### For Bugs
Please include:
- What you were doing
- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (network, browser, wallet)

### For Feature Ideas
Tell us:
- The problem you're trying to solve
- Your suggested solution
- Any alternatives you've considered

## Areas for Impact

We especially welcome contributions in:
- Game mechanics and puzzle logic
- User experience improvements
- Performance optimizations
- Test coverage
- Documentation and tutorials

## Getting Help

Need guidance? You can:
- Check our existing issues for similar problems
- Join our Discord community
- Tag maintainers in your comments: @maintainer

Remember, every contribution matters, whether it's fixing a typo or implementing a major feature. We aim to respond to all contributions within 2 business days.

---

Thank you for helping make JigIT better!